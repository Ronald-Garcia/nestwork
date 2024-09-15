import useAuth from "@/hooks/use-auth";
import { $router } from "@/lib/router";
import { getPagePath, redirectPage } from "@nanostores/router";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ImageUpload from "../image-upload";
import { onboardUser } from "@/data/api";
import { useStore } from "@nanostores/react";
import { $avatarUrl, $user } from "@/lib/store";
import { useEffect } from "react";

const Onboarding = () => {
  const avatarUrl = useStore($avatarUrl);
  const user = useStore($user);
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const picture = avatarUrl;
    const email = formData.get("email") as string;
    const department = formData.get("department") as string;
    const hobbies = formData.get("hobbies") as string;
    console.log({picture, email, department, hobbies})
    await onboardUser({ picture, email, department, hobbies});
    redirectPage($router, "home")
  };

  useEffect(()=> {

  })

  return (
    <div className="space-y-8">
      <div className="text-3xl font-bold text-center">
        Setting preferences
      </div>
      <p className="text-center">
        Or{" "}
        <a href={getPagePath($router, "home")} className="hover:underline">
          or click here to skip
        </a>
      </p>
      <form
        className="flex flex-col gap-3"
        onSubmit={handleFormSubmit}
        method="POST"
      >
        <ImageUpload></ImageUpload>

        <Label htmlFor="email">Contact Email</Label>
        <Input
          id="email"
          name="email"
          placeholder="Enter your email"
          defaultValue={user.options ? user.options.email : ""}
          type="text"
          autoComplete="email"
        />
        <Label htmlFor="department">Department</Label>
        <Input
          id="department"
          name="department"
          placeholder="Enter your department"
          type="text"
          defaultValue={user.options ? user.options.department : ""}
          autoComplete="department"
        />
        <Label htmlFor="hobbies">Hobbies</Label>
        <Input
          id="hobbies"
          name="hobbies"
          placeholder="Enter some of your hobbies!"
          type="text"
          defaultValue={user.options ? user.options.hobbies : ""}
          autoComplete="hobbies"
        />
        <Button type="submit">Sign up</Button>
      </form>
    </div>
  );
};

export default Onboarding;
