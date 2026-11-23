import { useEffect, useState, type RefObject } from "react";

export function useCenteredTop(
  containerRef: RefObject<HTMLElement | null>,
  contentRef: RefObject<HTMLElement | null>,
) {
  const [top, setTop] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const observer = new ResizeObserver(() => {
      setTop(Math.max(0, (container.clientHeight - content.offsetHeight) / 2));
    });
    observer.observe(container);
    observer.observe(content);
    return () => observer.disconnect();
  }, [containerRef, contentRef]);

  return top;
}
