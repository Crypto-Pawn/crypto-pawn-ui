import {cn} from "@/libs/style.ts";
import {Button} from "@/components/ui/Button.tsx";
import {useState} from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import FormCreateLoan from "./ui/FormCreateLoan";

const ButtonCreateLoan: React.FunctionComponent = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="purple"
            className={cn(
              "text-base",
              "hover:text-purple-600 ")}
          >
            Create a Loan
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Loan Details</DialogTitle>
          </DialogHeader>
          {open && <FormCreateLoan closeDialog={() => setOpen(false)} />}
        </DialogContent>
      </Dialog>
    </>
  )
}
export default ButtonCreateLoan;