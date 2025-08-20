# Firebase Authentication Setup - Honeyfy

## Krok 1: Stwórz projekt Firebase

1. Idź do [Firebase Console](https://console.firebase.google.com)
2. Kliknij "Add project" (Dodaj projekt)
3. Wprowadź nazwę projektu: "Honeyfy"
4. Włącz Google Analytics (opcjonalne)
5. Poczekaj aż projekt zostanie stworzony

## Krok 2: Skonfiguruj Authentication

1. W Firebase Console, idź do **Authentication**
2. Kliknij **Get started**
3. Przejdź do zakładki **Sign-in method**
4. Włącz następujące providers:
   - **Email/Password** - kliknij Enable
   - **Google** - kliknij Enable
   - **Facebook** - kliknij Enable (będzie wymagał dodatkowej konfiguracji)

## Krok 3: Pobierz klucze Firebase

1. Idź do **Project settings** (koło zębate obok Project Overview)
2. Przewiń w dół do sekcji "Your apps"
3. Kliknij ikonę **Web** (</>) żeby dodać web app
4. Wprowadź nazwę app: "Honeyfy Web"
5. Skopiuj konfigurację Firebase

## Krok 4: Dodaj klucze do .env.local

Stwórz/zaktualizuj plik `.env.local` i dodaj:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Krok 5: Konfiguracja Google OAuth

Google OAuth powinien działać automatycznie z Firebase Authentication.

## Krok 6: Konfiguracja Facebook OAuth

1. Idź do [Facebook for Developers](https://developers.facebook.com)
2. Stwórz nową aplikację
3. Dodaj produkt **Facebook Login**
4. W sekcji Facebook Login Settings:
   - Dodaj Valid OAuth Redirect URI: `https://your-project-id.firebaseapp.com/__/auth/handler`
5. Skopiuj App ID i App Secret
6. W Firebase Console → Authentication → Sign-in method → Facebook:
   - Wklej App ID i App Secret
   - Skopiuj OAuth redirect URI z Firebase i dodaj do Facebook App

## Krok 7: Testowanie

1. Uruchom projekt: `npm run dev`
2. Idź do `/auth/login` lub `/auth/signup`
3. Przetestuj:
   - ✅ Rejestrację email/hasło
   - ✅ Logowanie email/hasło
   - ✅ Logowanie Google
   - ✅ Logowanie Facebook

## Funkcje systemu autoryzacji:

### ✅ **Zaimplementowane:**
- **Email/Hasło** - rejestracja i logowanie
- **Google OAuth** - logowanie jednym kliknięciem
- **Facebook OAuth** - logowanie jednym kliknięciem
- **Piękny UI** - motyw miodowy, responsive design
- **Obsługa błędów** - czytelne komunikaty
- **Loading states** - animacje ładowania
- **Polskie tłumaczenia** - całkowicie po polsku

### 🎨 **Design:**
- **Gradient background** - żółto-pomarańczowy
- **Social buttons** - z oficjalnymi ikonami
- **Responsive** - działa na wszystkich urządzeniach
- **Honey theme** - 🍯 emotikony i żółte akcenty

### 📱 **Strony:**
- **`/auth/login`** - strona logowania
- **`/auth/signup`** - strona rejestracji
- **Automatyczne przekierowanie** - do `/dashboard` po zalogowaniu

### 🔐 **Bezpieczeństwo:**
- **Firebase Authentication** - industy standard
- **Secure sessions** - automatyczne zarządzanie sesją
- **Social OAuth** - bezpieczne logowanie przez Google/Facebook

## Następne kroki:

Po skonfigurowaniu Firebase, możesz:
1. Zintegrować Firebase auth z istniejącym AuthContext
2. Dodać resetowanie hasła
3. Dodać weryfikację email
4. Zintegrować z bazą danych Firestore

Twój system autoryzacji Firebase jest gotowy! 🍯✨
