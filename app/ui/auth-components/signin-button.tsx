import { signIn } from "@/auth"
 
export function SignInButton() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("credentials",{redirectTo:"/"})
      }}
    >
      <button type="submit">Sign in</button>
    </form>
  )
}