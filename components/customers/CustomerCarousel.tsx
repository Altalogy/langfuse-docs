// TODO: Reimplement using fumadocs source.getPages() to list customer stories in a carousel.
// Previously used getPagesUnderRoute("/customers") from Nextra which no longer exists.

interface CustomerCarouselProps {
  path?: string;
  title?: string;
  description?: string;
  showDots?: boolean;
  loop?: boolean;
  className?: string;
}

export const CustomerCarousel = ({
  path = "/customers",
  title,
  description,
  showDots = true,
  loop = false,
  className = "",
}: CustomerCarouselProps) => {
  // TODO: Fetch customer story pages from fumadocs source and render carousel
  return null;
};
