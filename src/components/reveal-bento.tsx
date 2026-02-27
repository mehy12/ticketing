"use client";
import React from "react";
import { MotionProps, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import {
  InstagramIcon,
  LinkedinIcon,
  LocateIcon,
  MailIcon,
  MoveRight,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import RichTooltip from "@/components/ui/smoothui/rich-popover";

export const RevealBento = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-transparent/70 px-4 py-12 text-zinc-50">
      <Logo />
      <motion.div
        initial="initial"
        animate="animate"
        transition={{
          staggerChildren: 0.05,
        }}
        className="mx-auto grid max-w-4xl grid-flow-dense grid-cols-12 gap-4"
      >
        <HeaderBlock />
        <SocialsBlock />
        <AboutBlock />
        <LocationBlock />
        <EmailListBlock />
      </motion.div>
      <Footer />
    </div>
  );
};

type BlockProps = {
  className?: string;
} & MotionProps;

const Block = ({ className, ...rest }: BlockProps) => {
  return (
    <motion.div
      variants={{
        initial: {
          scale: 0.5,
          y: 50,
          opacity: 0,
        },
        animate: {
          scale: 1,
          y: 0,
          opacity: 1,
        },
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
      className={twMerge(
        "col-span-4 rounded-lg border border-zinc-700 bg-zinc-800 p-6",
        className
      )}
      {...rest}
    />
  );
};

const HeaderBlock = () => (
  <Block className="col-span-12 row-span-2 md:col-span-6">
    <h1 className="mb-12 text-4xl font-medium leading-tight">
      Welcome to Ikyam 2026! 🎉
      <span className="text-zinc-400">
        Celebrating 25 Years of Culture, Talent & Entertainment!
      </span>
    </h1>
    <Link
      href="/"
      className="flex items-center gap-1 text-red-300 hover:underline"
    >
      Learn More <MoveRight />
    </Link>
  </Block>
);

const SocialsBlock = () => (
  <>
    <Block className="col-span-6 bg-red-500 md:col-span-3">
      <RichTooltip
        trigger={
          <button className="grid h-full w-full place-content-center text-3xl text-white cursor-pointer">
            <Youtube />
          </button>
        }
        title="Vemana Institute of Technology"
        description="Watch our official events, cultural highlights, and campus moments on YouTube."
        icon={<Youtube className="h-4 w-4 text-red-500" />}
        href="https://www.youtube.com/@vemanainstituteoftechnolog9250"
        actionLabel="Watch Now"
        actionHref="https://www.youtube.com/@vemanainstituteoftechnolog9250"
        meta="Event recaps"
        side="top"
      />
    </Block>
    <Block className="col-span-6 bg-fuchsia-700 md:col-span-3">
      <RichTooltip
        trigger={
          <button className="grid h-full w-full place-content-center text-3xl text-white cursor-pointer">
            <MailIcon />
          </button>
        }
        title="Ikyam.vemanothsav@gmail.com"
        description="Have questions or partnership inquiries? Reach out to us directly via email."
        icon={<MailIcon className="h-4 w-4 text-fuchsia-300" />}
        href="mailto:Ikyam.vemanothsav@gmail.com"
        actionLabel="Send Email"
        actionHref="mailto:Ikyam.vemanothsav@gmail.com"
        side="top"
      />
    </Block>
    <Block className="col-span-6 bg-blue-500 md:col-span-3">
      <RichTooltip
        trigger={
          <button className="grid h-full w-full place-content-center text-3xl text-black cursor-pointer">
            <LinkedinIcon />
          </button>
        }
        title="Vemana Institute of Technology"
        description="Connect with us on LinkedIn for professional updates, placements, and campus news."
        icon={<LinkedinIcon className="h-4 w-4 text-blue-400" />}
        href="https://www.linkedin.com/school/vemana-institute-of-technology-koramangala-bengaluru/"
        actionLabel="Connect"
        actionHref="https://www.linkedin.com/school/vemana-institute-of-technology-koramangala-bengaluru/"
        meta="500+ followers"
        side="top"
      />
    </Block>
    <Block className="col-span-6 bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-400 md:col-span-3">
      <RichTooltip
        trigger={
          <button className="grid h-full w-full place-content-center text-3xl text-white cursor-pointer">
            <InstagramIcon />
          </button>
        }
        title="@vemanotsav2k25"
        description="Follow us for the latest updates, behind-the-scenes moments, and event highlights from Ikyam 2026!"
        icon={<InstagramIcon className="h-4 w-4 text-pink-400" />}
        href="https://www.instagram.com/vemanotsav2k25/"
        actionLabel="Follow Us"
        actionHref="https://www.instagram.com/vemanotsav2k25/"
        meta="Updates daily"
        side="top"
      />
    </Block>
  </>
);

const AboutBlock = () => (
  <Block className="col-span-12 text-3xl leading-snug">
    <p>
      Experience the ultimate cultural festival! 🎭🎶
      <span className="text-zinc-400">
        Join us for electrifying performances, thrilling competitions, and an
        unforgettable celebration of art, music, and dance. In collaboration
        with Bigg Boss Kannada, expect special guest appearances and interactive
        experiences!
      </span>
    </p>
  </Block>
);

const LocationBlock = () => (
  <Block className="col-span-12 flex flex-col items-center gap-4 md:col-span-3">
    <RichTooltip
      trigger={
        <button className="inset-0 flex flex-col items-center gap-2 cursor-pointer">
          <LocateIcon className="text-3xl" />
          <p className="text-center text-lg text-zinc-400">
            Vemana Institute of Technology, Bangalore
          </p>
        </button>
      }
      title="VIT Koramangala, Bangalore"
      description="3rd Block, No. 1, Mahakavi Vemana Rd, Koramangala, Bengaluru, Karnataka 560034"
      icon={<LocateIcon className="h-4 w-4 text-emerald-400" />}
      href="https://www.google.com/maps/dir//3rd+Block,+No.+1,+Mahakavi+Vemana+Rd,+Koramangala+3+Block,+Koramangala,+Bengaluru,+Karnataka+560034/@12.9296361,77.5400661,21767m/data=!3m1!1e3!4m8!4m7!1m0!1m5!1m1!1s0x3bae145bd0354b43:0x1b1420a6cc18d678!2m2!1d77.622468!2d12.929649"
      actionLabel="Get Directions"
      actionHref="https://www.google.com/maps/dir//3rd+Block,+No.+1,+Mahakavi+Vemana+Rd,+Koramangala+3+Block,+Koramangala,+Bengaluru,+Karnataka+560034/@12.9296361,77.5400661,21767m/data=!3m1!1e3!4m8!4m7!1m0!1m5!1m1!1s0x3bae145bd0354b43:0x1b1420a6cc18d678!2m2!1d77.622468!2d12.929649"
      side="top"
    />
  </Block>
);

const EmailListBlock = () => (
  <Block className="col-span-12 md:col-span-9">
    <p className="mb-3 text-lg">Stay Updated with Ikyam 2026!</p>
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex items-center gap-2"
    >
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full rounded border border-zinc-700 bg-zinc-800 px-3 py-1.5 transition-colors focus:border-red-300 focus:outline-0"
      />
      <button
        type="submit"
        className="flex items-center gap-2 whitespace-nowrap rounded bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-300"
      >
        <MailIcon /> Subscribe
      </button>
    </form>
  </Block>
);

const Logo = () => {
  return (
    <Image
      width={400}
      height={400}
      src="/logo.png"
      alt="Ikyam 2026 Logo"
      className="mx-auto "
    />
  );
};

const Footer = () => {
  return (
    <div className=" mt-10 container border-t py-6">
      <p className="text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Vemanostava, Inc. All rights reserved. | Meesam Hyder & Akshyanshu Sekhar Nayak
      </p>
    </div>
  );
};
