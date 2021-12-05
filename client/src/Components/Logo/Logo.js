import { useSelector } from "react-redux"

export const Logo = () => {

  const user  = useSelector(state => state.auth.user)

    return (
        <>
          {user.name}
        </>
    )
}