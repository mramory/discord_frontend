import AuthComponent from './components/Auth'
import s from "./page.module.scss"


export default function Auth() {
  return (
    <div className={s.container}>
      <AuthComponent />
    </div>
  )
}
