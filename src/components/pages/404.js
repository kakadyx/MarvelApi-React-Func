import ErrorMessage from "../errorMessage/ErrorMessage"
import { Link } from "react-router-dom"

const Page404 = () => {
    return (
        <div style={{justifyContent: "center", display: "flex", alignContent: "center", flexDirection: "column", alignItems:"center"}}>
            <ErrorMessage/>
            <Link style={{display:'flex',justifyContent: "center",justifySelf: 'center', textAlign: "center", fontSize: 30, border: '2px solid black', width: '30%'}} to="/">На главную</Link>
        </div>
    )
}

export default Page404