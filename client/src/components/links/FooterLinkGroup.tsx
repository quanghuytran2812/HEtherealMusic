import { Link } from "react-router-dom"

interface FooterLinkGroupProps {
  title: string; 
  links: Array<{ href: string; text: string }>
}
const FooterLinkGroup = ({ title, links }: FooterLinkGroupProps) => {
  return (
    <div className="mb-8 md:mr-6">
    <ul className="flex flex-col gap-2 text-[#b3b3b3] text-base font-normal">
      <li>
        <p className="text-white font-bold">{title}</p>
      </li>
      {links.map((link, index) => (
        <li key={index} className="hover:underline hover:text-white">
          <Link to={link.href}>{link.text}</Link>
        </li>
      ))}
    </ul>
  </div>
  )
}

export default FooterLinkGroup