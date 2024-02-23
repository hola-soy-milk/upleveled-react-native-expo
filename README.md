# Let's learn React Native/Expo!

## 💻 [bit.ly/ul-rn-expo-2023](https://bit.ly/ul-rn-expo-2023)

![QR Code for instructions](https://user-images.githubusercontent.com/656318/221058958-3f0c51ba-bcf7-448e-8a6d-95f0976c445e.png)

<div style="display:flex;">
<img width="442" alt="Screenshot of running app" src="https://user-images.githubusercontent.com/656318/221058614-48edef4e-5040-46c9-963d-91d2e15fb574.png">
</div>

## 💜 Hi, I'm Ramón!

If you wanna get in touch, I'm on:

- [LinkedIn](https://www.linkedin.com/in/ramonhuidobro/)
- [Mastodon](hola-soy-milk.online/@ramon)
- [My Website](https://ramonh.dev)
- Twitter [@hola_soy_milk](https://twitter.com/hola_soy_milk)


Developer Relations, developer educator, inclusivity advocate. Over a decade of Software Engineering experience.

Originally from 🇨🇱.

## 🧰 Requirements

You should [already have everything needed installed](https://github.com/upleveled/system-setup/).

For this tutorial, we will be using Android Studio with Expo, which should be automatically taken care of when going through these instructions.

If you wish to work on your mobile device, go ahead and install [Expo Go](https://expo.dev/expo-go).

## ✨ Start up the project

Let's create a new Expo project, calling it "guest-list-mobile":

```
pnpm create expo@latest --template expo-template-blank-typescript
```

Configuring pnpm to use the hoisted `node_modules` structure, and installing the project's dependencies using `pnpm install --force`.

```
cd guest-list-mobile
echo 'node-linker=hoisted' > ./.npmrc
pnpm install --force
mv babel.config.js babel.config.cjs
```

Once everything is done installing, let's open it up and bring the terminal in:

      code .

Before proceeding, let's set up the [UpLeveled ESLint Config](https://github.com/upleveled/eslint-config-upleveled)!


First, let's take a look inside `package.json`:

```json
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
```

Let's start up the app with `pnpm start`. Our terminal will look like this:
<img width="728" alt="Terminal with QR code and options" src="https://user-images.githubusercontent.com/656318/221058734-f052a8b0-513b-4d8b-bc6e-866f51b4c60f.png">


With this running, press `a` (for Android!) and Android Studio will automatically start up, install Expo Go, and show your app.

## ✌️ Our `app.json` file

Notable options:

- `name`: Name of our app
- `slug`: URL-friendly code
- `version`: Version shown in the stores
- `orientation`: Which screen orientation is supported
- `icon`: App icon image
- `splash`: Settings for the screen shown while the app is loading
- `updates`: Configuration for hot-reloading
- `assetBundlePatterns`: Which files and assets to include
- `ios`: iOS-specific configuration
- `android`: Android-specific configuration
- `web`: Web-specific configuration

Let's set the background color of the splash screen and Android adaptive icon to be `"#f0e5cf"`.

## 🚶 First steps: the `styles` CSS object inside `./App.tsx`

> 🤔 Notice the naming style of CSS props in React Native

- Change the background color of the main view to `"#f0e5cf"`
- Change the text color to `"#3f3e41"` by creating a separate `text` object in the styles
- Let's extract `./styles/constants.ts` that exports a `colors` object with:

```typescript
export const colors = {
  background: "#f0e5cf",
  text: "#3f3e41",
  cardShadow: "#bfa2db",
  cardBackground: "#f0d9ff",
};
```

Apply those colors!

## ✍️ The `<Text>` component

Let's change the contents to "Guest List"! Not too different from React, eh?

## 🗣️ Creating a `<Header>` component

Let's have a header at the top of our app!

New file: `./components/Header.tsx`:

```typescript
import React from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import Constants from "expo-constants";
import { colors } from "../styles/constants";

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.cardBackground,
    width: "100%",
  },
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    paddingBottom: 20,
  },
  label: {
    color: colors.text,
    fontSize: 32,
    textAlign: "center",
  },
});
type Props = {
  label: string;
};

export default function Header(props: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.label}>{props.label}</Text>
      </View>
    </SafeAreaView>
  );
}

```

From the [docs](https://reactnative.dev/docs/safeareaview):

> The purpose of SafeAreaView is to render content within the safe area boundaries of a device. It is currently only applicable to iOS devices with iOS version 11 or later.

Let's integrate it into our App, replacing our `<Text>` element, and with the label prop `"Guest List"`.

> CHALLENGE: How do we bring it to the top? Hint: Styles in App.tsx

## ✨ Integrating custom fonts

We'll be integrating the Google [Pacifico Font](https://fonts.google.com/specimen/Pacifico).

Let's do this using expo's packages:

    npx expo install @expo-google-fonts/pacifico expo-font

Let's now integrate them into our App.tsx:

```typescript
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Header from "./components/Header";
import { colors } from "./styles/constants";
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  text: {
    color: colors.text,
  },
});

export default function App() {
  const [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <Header label="Guest List" />
        <StatusBar style="auto" />
      </View>
    );
  }
}
```

Let's now set the header's text to be `"Pacifico_400Regular"` with the `fontFamily` style.

## 🚴 Let's list our guests

We'll be using [FlatList](https://reactnative.dev/docs/flatlist).

Keep in mind the [structure of a `Guest` type](https://github.com/upleveled/express-guest-list-api-memory-data-store/blob/main/index.ts#L7)!

In `App.tsx`:

```typescript
type Guest = {
  id: string;
  firstName: string;
  lastName: string;
  deadline?: string;
  attending: boolean;
};

const renderItem = (item: { item: Guest }) => <GuestItem guest={item.item} />;

export default function App() {
  const [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <Header label="Guest List" />
        <StatusBar style="auto" />

        <FlatList
          style={styles.list}
          data={guests}
          renderItem={renderItem}
          keyExtractor={(item: Guest) => item.id}
        />
      </View>
    );
  }
}
```

To our styles object in the same file, we'll add:

```typescript
list: {
    marginTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%'
  },
```

Some things are a bit broken, it seems!

## 🚵 Our individual `GuestItem` component

Then let's define and style our guest item component. In `./components/GuestItem.tsx`:

```typescript
import { Text, StyleSheet, View } from "react-native";
import { colors } from "../styles/constants";

const styles = StyleSheet.create({
  right: {
    textAlign: "right",
    fontSize: 10,
  },
  center: {
    textAlign: "center",
  },
  card: {
    backgroundColor: colors.cardBackground,
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 30,
    marginBottom: 30,
    borderColor: colors.cardShadow,
    borderWidth: 0.5,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopRightRadius: 30,
    textAlign: "left",
  },
});

type Guest = {
  id: string;
  firstName: string;
  lastName: string;
  deadline?: string;
  attending: boolean;
};

type Props = {
  guest: Guest;
};

export default function GuestItem({ guest }: Props) {
  const { firstName, lastName, attending } = guest;
  return (
    <View style={styles.card}>
      <Text style={styles.center}>
        {firstName} {lastName}
      </Text>
      <Text style={styles.right}>{attending ? "Coming!" : "Not coming."}</Text>
    </View>
  );
}
```

Still got one more undefined variable issue. Let's get right on it!

## 📮 Create list of static guests

In `App.tsx`, after defining `renderItem`:

```javascript
const guests = [
  {
    id: '1',
    firstName: "Miralda",
    lastName: "Flores",
    attending: true,
  },
  {
    id: '2',
    firstName: "Ximena",
    lastName: "Alvarez",
    attending: false,
  },
];
```

## ⚛️ React Hooks for guests

Let's replace our `guests` const with `useState`:

```javascript
const [guests, setGuests] = useState([
  {
    id: '1',
    firstName: "Miralda",
    lastName: "Flores",
    attending: true,
  },
  {
    id: '2',
    firstName: "Ximena",
    lastName: "Alvarez",
    attending: false,
  },
]);
```

Next we'll need a screen to add guests. That's where screens come in.

## 📱 Screens

We're gonna use `expo-router` to create navigable screens.

First, let's shut down the app in the terminal.

Next, let's install Expo Router:

    npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar react-native-web react-dom

Go into `package.json` and change `main` and add the following:

```json
  "main": "index.tsx",
```

In `app.json`, add the following to 'expo':

```json
    "scheme": "guest-list-mobile",
    "web": {
      "bundler": "metro"
    }
```

Move `App.tsx` to `app/index.tsx` (make sure imports and component names move along!), and create a new `index.tsx` with the following:

```typescript
import "expo-router/entry";
```

## 🏣 Add a new guest page

Let's add a link to the new guest screen to `./app/index.tsx`:

```typescript
import { FlatList, StyleSheet, View } from 'react-native';
import { colors } from '../styles/constants';
import GuestItem from '../components/GuestItem';
import { Link, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
    textAlign: 'center',
    backgroundColor: colors.cardBackground,
    fontSize: 24,
  },
  list: {
    marginTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  text: {
    color: colors.text,
  },
});

type Guest = {
  id: string;
  firstName: string;
  lastName: string;
  deadline?: string;
  attending: boolean;
};

const renderItem = (item: { item: Guest }) => <GuestItem guest={item.item} />;

export default function Index() {
  const { firstName, lastName } = useLocalSearchParams<{
    firstName?: Guest['firstName'];
    lastName?: Guest['lastName'];
  }>();

  const [guests, setGuests] = useState([
    {
      id: '1',
      firstName: 'Miralda',
      lastName: 'Flores',
      deadline: 'none',
      attending: true,
    },
    {
      id: '2',
      firstName: 'Ximena',
      lastName: 'Alvarez',
      deadline: 'none',
      attending: false,
    },
  ]);

  useEffect(() => {
    if (typeof firstName === 'string' && typeof lastName === 'string') {
      setGuests([
        ...guests,
        { id: '1', firstName, lastName, attending: false, deadline: 'none' },
      ]);
    }
  }, [firstName, lastName]);
  return (
    <>
      <FlatList
        style={styles.list}
        data={guests}
        renderItem={renderItem}
        keyExtractor={(item: Guest) => item.id}
      />
      <Link style={styles.button} href="/new-guest">
        New Guest
      </Link>
    </>
  );
}
```

Add the following button styles:

```typescript
  button: {
    marginTop: 30,
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
    textAlign: 'center',
    backgroundColor: colors.cardBackground,
    fontSize: 24,
  },
```

Next, we'll add `app/new-guest.tsx`:

```typescript
import { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { colors } from '../styles/constants';
import { Link } from 'expo-router';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%',
  },
  button: {
    marginTop: 30,
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
    textAlign: 'center',
    backgroundColor: colors.cardBackground,
    fontSize: 24,
  },
});

export default function NewGuest() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  return (
    <>
      <TextInput
        style={styles.input}
        onChangeText={setFirstName}
        placeholder="First Name"
        value={firstName}
      />
      <TextInput
        style={styles.input}
        onChangeText={setLastName}
        placeholder="Last Name"
        value={lastName}
      />
      <Link
        style={styles.button}
        href={`/?firstName=${firstName}&lastName=${lastName}`}
      >
        Add
      </Link>
    </>
  );
}

```

Hold on, where'd our font and header go? Let's create `app/_layout.tsx`:

```typescript
import { StatusBar } from 'expo-status-bar';
import { Slot, usePathname } from 'expo-router';
import Header from '../components/Header';
import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import { View, StyleSheet } from 'react-native';
import { colors } from '../styles/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingBottom: 40,
  },
  slot: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
  },
});

function routeMapping(pathname: string) {
  switch (pathname) {
    case '/':
      return 'Guest List';
    case '/new-guest':
      return 'New Guest';
    default:
      return '';
  }
}

export default function HomeLayout() {
  const pathname = usePathname();
  const label = routeMapping(pathname);
  const [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Header label={label} />
      <StatusBar style="auto" />
      <View style={styles.slot}>
        <Slot />
      </View>
    </View>
  );
}
```

## 💾 Saving to the API

React Native gives us access to the `fetch` API! Let's use it to connect to a running instance of the [Guest List API](https://github.com/upleveled/express-guest-list-api-memory-data-store).

In `app/index.tsx`, let's adapt our `useEffect` callback:

```typescript
  const [guests, setGuests] = useState<Guest[]>([]);

  useEffect(() => {
    async function loadGuests() {
      const response = await fetch(`${API_URL}/guests`);
      const fetchedGuests: Guest[] = await response.json();
      setGuests(fetchedGuests);
    }
    async function postGuest(guest: { firstName: string; lastName: string }) {
      const response = await fetch(`${API_URL}/guests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: guest.firstName,
          lastName: guest.lastName,
        }),
      });
      const newGuest: Guest = await response.json();
      setGuests((g) => [...g, newGuest]);
    }
    loadGuests().catch(console.error);

    if (typeof firstName === 'string' && typeof lastName === 'string') {
      postGuest({ firstName, lastName });
    }
  }, [firstName, lastName]);
```

What's this constant we see? Why at the top of the file, add our API URL!

## 💁 Single guest dynamic routes

Create a new file called `guests/[id].tsx`:

```typescript
import { useEffect, useState } from 'react';

import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../../styles/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  text: {
    color: colors.text,
  },
});

type Guest = {
  id: string;
  firstName: string;
  lastName: string;
  deadline?: string;
  attending: boolean;
};

const API_URL =
  'https://37820499-b115-4574-94d1-64870873aef3-00-2o18dc9ex4s5s.spock.replit.dev';

export default function Guests() {
  const { id } = useLocalSearchParams();

  const [guest, setGuest] = useState<Guest>();

  useEffect(() => {
    async function loadGuest() {
      try {
        if (typeof id !== 'string') {
          return;
        }
        const response = await fetch(`${API_URL}/guests/${id}`);
        const fetchedGuest = await response.json();
        setGuest(fetchedGuest);
      } catch (error) {
        console.error('Error fetching guest', error);
      }
    }
    loadGuest().catch(console.error);
  }, [id]);

  if (!guest) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {guest.firstName} {guest.lastName}
      </Text>
      <Text style={styles.text}>
        {guest.attending ? 'Attending' : 'Not attending'}
      </Text>
    </View>
  );
}
```

Back in `/components/GuestItem.tsx`:

```typescript
export default function GuestItem({ guest }: Props) {
  const { id, firstName, lastName, attending } = guest;
  const openGuest = () => {
    router.push({
      pathname: `/guests/[id]`,
      params: { id },
    });
  };
  return (
    <TouchableOpacity style={styles.card} onPress={openGuest}>
      <Text style={styles.center}>
        {firstName} {lastName}
      </Text>
      <Text style={styles.right}>{attending ? 'Coming!' : 'Not coming.'}</Text>
    </TouchableOpacity>
  );
}
```

## 🛜 Push it all to GitHub!

## 🍪 What about cookies?

## 🚀 Deployment!

## 🗺️ API Routes
