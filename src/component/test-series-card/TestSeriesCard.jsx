import { Tag } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { cn } from "../../../lib/utils";

const TestSeriesCard = ({
  categoryModeId,
  modeType = "Online",
  name,
  label = [],
  imageId,
  discount,
  price,
  currency = "INR",
  postDiscountPrice,
  meta = [],
  language,
  buttonText = "Buy Now",
  parentSlug,
  className,
  onBuyClick,
}) => {
  const currencySymbol = currency === "INR" ? "₹" : "$";
  const exploreLink = `${parentSlug}/${categoryModeId}-${modeType}`;
  const buyNowLink = `https://pw.live/study-v2/payments?redirect_url=test-series&info=${btoa(JSON.stringify({ planId: "", categoryModeId, passId: "" }))}`;

  return (
    <div
      className={cn(
        "relative w-full max-w-[340px] rounded-xl bg-card shadow-card transition-all duration-300 hover:shadow-card-hover border border-border",
        className,
      )}
    >
      {/* Online/Offline Tag */}
      <img
        src={
          modeType === "Online"
            ? "https://static.pw.live/images/onlineTag_20241022124328.webp"
            : "https://static.pw.live/images/offlineTag.webp"
        }
        alt={modeType}
        className="absolute top-0 left-0 w-24 h-auto z-10"
      />

      <div className="flex flex-col gap-3 p-4">
        {/* Header Section */}
        <div className="flex flex-col gap-3.5">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-lg font-bold text-card-foreground leading-tight line-clamp-2 h-14 flex-1">
              {name}
            </h4>
            <div className="flex items-center gap-2 shrink-0">
              {label.map((item, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className={cn(
                    "text-xs font-semibold px-2.5 py-1 rounded-full",
                    item.variant === "warning" &&
                      "bg-warning/20 text-warning-foreground",
                    item.variant === "success" &&
                      "bg-success-light text-success",
                    item.variant === "neutral" &&
                      "bg-course-badgeBg text-course-badgeText",
                  )}
                >
                  {item.text}
                </Badge>
              ))}
              {/* WhatsApp Share */}
              <a
                href={`https://wa.me/?text=Check%20out%20this%20test%20series:%20${encodeURIComponent(name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 cursor-pointer transition-transform hover:scale-110"
              >
                <img
                  alt="WhatsApp"
                  src="https://static.pw.live/5eb393ee95fab7468a79d189/ADMIN/a83911ed-71f4-47d6-ba55-ca96911627a4.webp"
                  className="w-6 h-6"
                />
              </a>
            </div>
          </div>

          {/* Course Image */}
          <div className="w-full aspect-[16/9] rounded-md overflow-hidden bg-muted">
            <img
              alt="Course"
              src={imageId.baseUrl}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        {/* Meta/Features List */}
        {meta.length > 0 && (
          <div className="flex flex-col gap-2.5 max-h-[200px] ">
            {meta.map((item, index) => (
              <div key={index} className="flex gap-2.5 items-start">
                <img alt="point" src={item.icon} className="w-6 h-6 shrink-0" />
                <p
                  className="text-xs text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item.text }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Language Badge */}
        {language && (
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="bg-muted text-muted-foreground text-xs"
            >
              {language}
            </Badge>
          </div>
        )}

        {/* Price Section */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold text-primary">
              {currencySymbol}
              {postDiscountPrice}
            </span>
            {price !== postDiscountPrice && (
              <span className="text-base text-muted-foreground line-through">
                {currencySymbol}
                {price}
              </span>
            )}
          </div>

          {/* Discount Badge */}
          {discount && discount > 0 && (
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="28"
                viewBox="0 0 11 24"
                fill="none"
                className="h-7 -mr-[3px]"
              >
                <path
                  d="M1.07059 12.6562C0.743397 12.2799 0.743397 11.7201 1.07059 11.3438L10.5 0.5L10.5 23.5L1.07059 12.6562Z"
                  className="fill-success-light"
                />
              </svg>
              <div className="flex items-center gap-1.5 bg-success-light px-2.5 py-1.5 rounded-r-md">
                <Tag className="w-3.5 h-3.5 text-success" />
                <span className="text-xs font-semibold text-success">
                  {discount}% OFF
                </span>
              </div>
            </div>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-3 pt-1">
          <Button
            variant="outline"
            className="flex-1 border-primary text-primary hover:bg-primary/5 font-semibold"
            asChild
          >
            <a href={exploreLink}>EXPLORE</a>
          </Button>
          <Button
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            onClick={onBuyClick}
            asChild
          >
            <a href={buyNowLink}>{buttonText.toUpperCase()}</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestSeriesCard;
