const LegalLink = ({ href, text }: { href: string; text: string }) => {
  return (
    <div className="mr-4">
    <a href={href}>
      <span className="text-[#b3b3b3] text-[0.6875rem] font-normal">{text}</span>
    </a>
  </div>
  )
}

export default LegalLink