import { useState } from "react";
import { Textarea } from "@/components/ui/TextArea";
import Button, { buttonVariants } from "@/components/ui/Button";
import { api } from "@/utils/api";
import { Loader2 } from "lucide-react";

type FeedBackReviewProps = {
  title: string;
  description: string;
  roomUrl: string;
};

const Star = ({ yellow }: { yellow: boolean }) => {
  return (
    <svg
      className={`${
        yellow ? "fill-yellow-500" : ""
      } hover:duration-650 transition`}
      width={50}
      height={50}
      clip-rule="evenodd"
      fill-rule="evenodd"
      stroke-linejoin="round"
      stroke-miterlimit="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44zm.678 2.033-2.361 4.792-5.246.719 3.848 3.643-.948 5.255 4.707-2.505 4.707 2.505-.951-5.236 3.851-3.662-5.314-.756z"
        fill-rule="nonzero"
      />
    </svg>
  );
};

const FeedBackReview = ({
  title,
  description,
  roomUrl,
}: FeedBackReviewProps) => {
  const [hoverIndex, setHoverIndex] = useState(0);
  const [rating, setRating] = useState(0);
  const [feedBackMessage, setFeedBackMessage] = useState("");
  const ctx = api.useContext();
  const { mutate, isLoading: isPosting } = api.feedback.add.useMutation({
    onSettled: () => {
      void ctx.feedback.invalidate();
      setFeedBackMessage("");
    },
  });

  return (
    <div className="flex h-screen min-w-fit items-center justify-center">
      <div className="flex max-w-xl flex-col rounded-xl p-8 shadow-sm dark:bg-gray-900 dark:text-gray-100 lg:p-12">
        <div className="flex w-full flex-col items-center">
          <h2 className="text-center text-3xl font-semibold">{title}</h2>
          <div className="flex flex-col items-center space-y-3 py-6">
            <span className="text-center">{description}</span>
            <div className="flex space-x-3 ">
              <div className="text-center">
                <ul className="duration-0 flex cursor-pointer space-x-3 ">
                  {[1, 2, 3, 4, 5].map((index) => (
                    <li
                      onMouseEnter={() => setHoverIndex(index)}
                      key={index}
                      onMouseLeave={() => setHoverIndex(0)}
                      onClick={() => setRating(index)}
                    >
                      <Star yellow={index <= hoverIndex || index <= rating} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col">
            <Textarea
              value={feedBackMessage}
              onChange={(e) => setFeedBackMessage(e.target.value)}
              rows={5}
              placeholder="Message..."
              className="resize-none rounded-md p-4 dark:bg-gray-900 dark:text-gray-100"
            />
            <Button
              disabled={isPosting || feedBackMessage === ""}
              size="lg"
              className={buttonVariants({
                variant: "default",
                className:
                  "my-8 rounded-md py-4 font-semibold dark:bg-violet-400 dark:text-gray-900",
              })}
              onClick={() => {
                void mutate({
                  message: feedBackMessage,
                  title: title,
                  description: description,
                  star: String(rating),
                  roomUrl: roomUrl,
                });
              }}
            >
              {isPosting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending feedback
                </>
              ) : (
                <>Leave feedback</>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FeedBackReview;