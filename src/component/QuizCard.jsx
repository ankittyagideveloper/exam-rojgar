import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, FileText, Award, Languages, Star } from "lucide-react";

const QuizCard = ({
  title,
  questions,
  marks,
  duration,
  languages,
  userCount,
  rating,
  isFree = false,
  isNew = false,
  onStartClick,
}) => {
  return (
    <Card className="p-3 sm:p-4 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 group">
      {/* Badges */}
      <div className="flex gap-2 mb-2 sm:mb-3">
        {isFree && (
          <Badge
            variant="success"
            className="text-xs font-medium px-2 py-1 rounded"
          >
            FREE
          </Badge>
        )}
        {isNew && (
          <Badge
            variant="info"
            className="text-xs font-medium px-2 py-1 rounded"
          >
            NEW INTERFACE
          </Badge>
        )}
      </div>

      {/* Content Layout */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
        {/* Left Content */}
        <div className="flex-1 space-y-2 sm:space-y-3">
          {/* Title */}
          <div>
            <h3 className="text-sm sm:text-base font-medium text-gray-900 leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            {rating && (
              <div className="flex items-center gap-1 mt-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium text-gray-700">
                  {rating}
                </span>
                <span className="text-xs text-gray-500">{userCount} Users</span>
              </div>
            )}
          </div>

          {/* Quiz Details - Single Row */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              <span>{questions} Qs</span>
            </div>
            <div className="flex items-center gap-1">
              <Award className="h-3 w-3" />
              <span>{marks} Marks</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{duration} Mins</span>
            </div>
          </div>

          {/* Languages */}
          <div className="flex items-center gap-2">
            <Languages className="h-3 w-3 text-primary" />
            <div className="text-xs text-primary font-medium">
              {languages.slice(0, 2).join(", ")}
              {languages.length > 2 && (
                <span className="text-gray-500">
                  {" "}
                  + {languages.length - 2} More
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Action Button */}
        <div className="flex sm:flex-shrink-0">
          <Button
            onClick={onStartClick}
            size="sm"
            className="w-full sm:w-auto px-4 py-2 bg-primary hover:bg-primary-hover text-white font-medium text-xs rounded transition-colors"
          >
            Start Now
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default QuizCard;
