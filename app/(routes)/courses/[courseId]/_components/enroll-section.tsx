import LoaderButton from "@/components/loader-btn";
import { Button } from "@/components/ui/button";
import { Course, Purchase } from "@prisma/client";
import { Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EnrollSectionPage {
  initialData: Course;
  checkBought: Purchase | null;
}
const EnrollSectionPage = ({ initialData, checkBought }: EnrollSectionPage) => {
  const router = useRouter();
  const [showEnroll, setShowEnroll] = useState(false);

  const gotoLecture = () => {
    router.push(`/courses/enrolled/${checkBought?.id}`);
  };

  return (
    <>
      <div className="col-span-1 p-5">
        {checkBought ? (
          <div className="bg-slate-100 h-full text-center p-1 border border-black">
            <div className="p-5 border border-white text-white bg-black">
              <p className="text-lg font-bold">{initialData.title}</p>
            </div>
            <div className="p-4">
              <div className="mt-10 space-y-5">
                <p>You have bought this course</p>
                <LoaderButton
                  condition={`Go to lecture`}
                  onClick={gotoLecture}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-100 h-full text-center p-1 border border-black">
            <div className="p-5 border border-black text-white bg-black">
              <p>{initialData.title}</p>
            </div>
            <div className="p-4">
              <div className="mt-10 space-y-5">
                <p className="text-3xl font-bold">${initialData.price}</p>
                <Button onClick={() => setShowEnroll(true)}>Enroll</Button>
              </div>
            </div>
          </div>
        )}
      </div>
      {showEnroll && (
        <div className="enroll-sec fixed z-[1000] top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-35">
          <div className="relative h-3/4 w-1/3 bg-white rounded-xl p-3 text-center">
            <div className="flex justify-end">
              <button
                className="hover:text-slate-700"
                onClick={() => setShowEnroll(false)}
              >
                <X />
              </button>
            </div>
            <p className="text-xl">Payment Method</p>
            <div className="enroll-method mt-10 px-10">
              <div className=" bg-slate-100 w-full h-12 rounded-md grid grid-cols-3 px-4">
                <div className="flex items-center">logo</div>
                <div className="flex items-center justify-center">Paypal</div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EnrollSectionPage;
