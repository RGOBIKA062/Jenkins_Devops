import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Form, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const CreateEventModal = ({ onCreate } = {}) => {
  const [open, setOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      title: "",
      organizer: "",
      date: "",
      time: "",
      location: "",
      description: "",
      tags: ""
    }
  });

  function onSubmit(values) {
    const payload = {
      ...values,
      tags: values.tags ? values.tags.split(",").map((t) => t.trim()).filter(Boolean) : []
    };
    try {
      if (typeof onCreate === "function") {
        onCreate(payload);
      }
      toast({ title: "Event created", description: "Your event was created (local preview)." });
      setOpen(false);
      form.reset();
    } catch (err) {
      toast({ title: "Error", description: "Could not create event." });
    }
  }

  return /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { children: "Create Event" }) }),
    /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Create New Event" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Fill the form below to create a new event." })
      ] }),
      /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-4", children: [
        /* Title */ /* @__PURE__ */ jsxs(FormItem, { children: [
          /* @__PURE__ */ jsx(FormLabel, { children: "Title" }),
          /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...form.register("title"), placeholder: "Event title" }) }),
          /* @__PURE__ */ jsx(FormMessage, {})
        ] }),
        /* Organizer */ /* @__PURE__ */ jsxs(FormItem, { children: [
          /* @__PURE__ */ jsx(FormLabel, { children: "Organizer" }),
          /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...form.register("organizer"), placeholder: "Organizer name" }) }),
          /* @__PURE__ */ jsx(FormMessage, {})
        ] }),
        /* Date/time/location */ /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-2", children: [
          /* @__PURE__ */ jsxs(FormItem, { children: [
            /* @__PURE__ */ jsx(FormLabel, { children: "Date" }),
            /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...form.register("date"), placeholder: "e.g. March 15, 2025" }) }),
            /* @__PURE__ */ jsx(FormMessage, {})
          ] }),
          /* @__PURE__ */ jsxs(FormItem, { children: [
            /* @__PURE__ */ jsx(FormLabel, { children: "Time" }),
            /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...form.register("time"), placeholder: "e.g. 10:00 AM - 4:00 PM" }) }),
            /* @__PURE__ */ jsx(FormMessage, {})
          ] }),
          /* @__PURE__ */ jsxs(FormItem, { children: [
            /* @__PURE__ */ jsx(FormLabel, { children: "Location" }),
            /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...form.register("location"), placeholder: "Venue or online link" }) }),
            /* @__PURE__ */ jsx(FormMessage, {})
          ] })
        ] }),
        /* Description */ /* @__PURE__ */ jsxs(FormItem, { children: [
          /* @__PURE__ */ jsx(FormLabel, { children: "Description" }),
          /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Textarea, { ...form.register("description"), placeholder: "Short description" }) }),
          /* @__PURE__ */ jsx(FormMessage, {})
        ] }),
        /* Tags */ /* @__PURE__ */ jsxs(FormItem, { children: [
          /* @__PURE__ */ jsx(FormLabel, { children: "Tags (comma separated)" }),
          /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...form.register("tags"), placeholder: "AI/ML, Workshop, Beginner" }) }),
          /* @__PURE__ */ jsx(FormMessage, {})
        ] }),
        /* Footer buttons */ /* @__PURE__ */ jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsx(DialogClose, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "outline", children: "Cancel" }) }),
          /* @__PURE__ */ jsx(Button, { type: "submit", children: "Create" })
        ] })
      ] }) })
    ] })
  ] });
};

export default CreateEventModal;
