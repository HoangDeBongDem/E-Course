import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Link } from "react-router-dom";

const Course = ({ course }) => {
  return (
    <Link to={`/course-detail/${course._id}`}>
      <Card className="overflow-hidden rounded-lg dark:bg-white-800 dark:text-black bg-white text-black hover:transform hover:scale-105 transition-all duration-300 border-[#6D28D2]">
        <div className="relative">
          <img
            src={course.courseThumbnail}
            alt="course"
            className="w-full h-36 object-cover rounded-t-lg"
          />
        </div>
        <CardContent className="px-5 py-4 space-y-3">
          <h1 className="hover:underline font-semibold text-lg truncate">
            {course.courseTitle}
          </h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* <Avatar className="h-8 w-8">
              <AvatarImage src={course.creator?.photoUrl || "https://github.com/shadcn.png"} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar> */}
              <h1 className="font-italic text-sm">{course.creator?.name}</h1>
            </div>
            <Badge
              className={
                "bg-[#2B2D3F] text-white px-2 py-1 text-xs rounded-full"
              }
            >
              {course.courseLevel}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Course;
