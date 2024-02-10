import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ModeToggle } from "@/mode-toggle";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import AxiosInstance from "@/lib/AxiosInstance";
import toast from "react-hot-toast";
import { data } from "autoprefixer";
export default function Settings() {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate()
  const handleUserDelete = async (e) => {
    e.preventDefault();
    try {
      if (name === user?.username) {
        const { data } = await AxiosInstance.delete("/api/v1/delete/me");
        if (data.success) {
          toast.success("profile deleted...");
          navigate("/login");
        
        }
      }
      if (!data.success) {
        toast.error("you have entered a wrong name");
        return;
      }
    } catch (error) {
      console.log(error);
      toast.error("error while deleting");
    }
  };

  return (
    <div className="all settings will be here mx-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Settings
      </h1>
      <div className="all_settings mx-2">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Annonymous</AccordionTrigger>
            <AccordionContent>
              <RadioGroup defaultValue="comfortable">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="default" id="r1" />
                  <Label htmlFor="r1">Default</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="comfortable" id="r2" />
                  <Label htmlFor="r2">Comfortable</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="compact" id="r3" />
                  <Label htmlFor="r3">Compact</Label>
                </div>
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Update Profile</AccordionTrigger>
            <AccordionContent>new name,password bla bla</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Theme</AccordionTrigger>
            <AccordionContent>
              <ModeToggle />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Delete Profile</AccordionTrigger>
            <AccordionContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-red-500">Delete</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <form onSubmit={handleUserDelete}>
                    <DialogHeader>
                      <DialogTitle>Are you sure?</DialogTitle>
                      <DialogDescription>
                        Make changes to your profile cannot be undone!!
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Your Name?
                        </Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Delete</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <hr />
      </div>
    </div>
  );
}
