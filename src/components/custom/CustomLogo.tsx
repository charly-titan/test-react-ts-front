import { Link } from "react-router"

interface Props{
    subTitle?:string
}

export const CustomLogo = ({subTitle = 'Shop'}:Props) => {
     
    return (
        <Link to='/' className="flex text-center whitespace-nowrap">
            <span className="font-montserrat font-bold text-xl m-0 whitespace-nowrap">Toslo |</span>
            <p className="text-muted-foreground m-0 px-2 whitespace-nowrap">{ subTitle }</p>
        </Link>
    )
}