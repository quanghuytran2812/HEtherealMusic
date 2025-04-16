import { body_large, body_medium, error_page, img_cover } from "@/lib/classname";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className={cn(error_page)}>
      <img
        src="https://res.cloudinary.com/dvsokroe6/image/upload/v1739503783/users/dcwgzprdkuxqpfgdavvw.png"
        alt="HEthereal"
        width={48}
        height={48}
        loading="lazy"
        decoding="async"
        className={cn(img_cover, "bg-[#FFFDE4] rounded-full")}
      />

      <div>
        <h2 className={cn("text-3xl font-bold")}>Page not found!</h2>

        <p className={cn("mt-2 opacity-80", body_large)}>
          We can't seem to find the page you are looking for.
        </p>
      </div>

      <Link to="/" className="btn-error-page">
        <p
          className={cn(body_medium, "flex items-center gap-2 px-4 py-3")}
        >
          <ArrowLeft size={16} />
          Back to home
        </p>
      </Link>
    </div>
  );
};

export default NotFoundPage;
