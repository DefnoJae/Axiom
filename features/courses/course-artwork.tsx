import { cn } from "@/lib/utils";
import type { Course } from "@/types";

export function CourseArtwork({ course, compact = false }: { course: Course; compact?: boolean }) {
  return (
    <div className={cn("course-artwork", `art-${course.artwork}`, compact && "compact")} aria-hidden="true">
      <span className="folder-tab" />
      <span className="folder-face"><i /> <b>{course.code}</b></span>
    </div>
  );
}
