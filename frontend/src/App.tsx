import Routes from "./components/Routes"
import AuthProvider from "./contexts/AuthContext"
import ModalProvider from "./contexts/ModalContext"
import NoteProvider from "./contexts/NoteContext"

function App() {
  return (
    <AuthProvider>
      <ModalProvider>
        <NoteProvider>
          <Routes />
        </NoteProvider>
      </ModalProvider>
    </AuthProvider>
  )
}

export default App
