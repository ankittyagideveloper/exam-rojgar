import { StickyBanner } from "../../components/ui/sticky-banner";

export function StickyBannerDemo() {
  return (
    <div className=" relative flex  w-full flex-col overflow-y-auto">
      <StickyBanner
        className="bg-gradient-to-b from-blue-500 to-blue-600 "
        hideOnScroll
      >
        <p className="mx-0 max-w-[90%] text-white drop-shadow-md">
          Join Telegram for more updates.{" "}
          <a
            href="https://t.me/ExamRojgaar"
            className="transition duration-200 hover:underline"
            target="_blank"
          >
            Link
          </a>
        </p>
      </StickyBanner>
    </div>
  );
}
