import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropDownMenu";
import DeleteRoom from "@/components/DeleteRoom";

type DropDownProps = {
  id: string;
  //   title: string;
  //   description: string;
  //   openSideModal: boolean;
  //   setOpenSideModal: (value: boolean) => void;
};
export function DropDown({ id }: DropDownProps) {
  //   const [currentTitle, setCurrentTitle] = useState(title);
  //   const [currentDescription, setCurrentDescription] = useState(description);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="font-sm rounded-lg bg-white text-center text-sm text-gray-900 focus:outline-none  dark:bg-gray-800 dark:text-white ">
          <svg
            className="h-6 w-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
          </svg>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSeparator />
        <DeleteRoom id={id} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
