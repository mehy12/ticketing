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
      Welcome to Ekyam 2026! 🎉
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
      <Link
        href="https://www.youtube.com/@vemanainstituteoftechnolog9250"
        className="grid h-full place-content-center text-3xl text-white"
      >
        <Youtube />
      </Link>
    </Block>
    <Block className="col-span-6 bg-fuchsia-700 md:col-span-3">
      <Link
        href="mailto:Ekyam.vemanothsav@gmail.com"
        className="grid h-full place-content-center text-3xl text-white"
      >
        <MailIcon />
      </Link>
    </Block>
    <Block className="col-span-6 bg-blue-500 md:col-span-3">
      <Link
        href="https://www.linkedin.com/school/vemana-institute-of-technology-koramangala-bengaluru/?originalSubdomain=in"
        className="grid h-full place-content-center text-3xl text-black"
      >
        <LinkedinIcon />
      </Link>
    </Block>
    <Block className="col-span-6 bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-400 md:col-span-3">
      <Link
        href="https://www.instagram.com/vemanotsav2k25/"
        className="grid h-full place-content-center text-3xl text-white"
      >
        <InstagramIcon />
      </Link>
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
  <Block className="col-span-12 flex flex-col items-center  gap-4 md:col-span-3">
    <Link
      href={
        "https://www.google.com/maps/dir//3rd+Block,+No.+1,+Mahakavi+Vemana+Rd,+Koramangala+3+Block,+Koramangala,+Bengaluru,+Karnataka+560034/@12.9296361,77.5400661,21767m/data=!3m1!1e3!4m8!4m7!1m0!1m5!1m1!1s0x3bae145bd0354b43:0x1b1420a6cc18d678!2m2!1d77.622468!2d12.929649?entry=ttu&g_ep=EgoyMDI1MDMwMi4wIKXMDSoASAFQAw%3D%3D"
      }
      className="inset-0 flex flex-col items-center"
    >
      <LocateIcon className="text-3xl" />
      <p className="text-center text-lg text-zinc-400">
        Vemana Institute of Technology, Bangalore
      </p>
    </Link>
  </Block>
);

const EmailListBlock = () => (
  <Block className="col-span-12 md:col-span-9">
    <p className="mb-3 text-lg">Stay Updated with Ekyam 2026!</p>
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
      alt="Ekyam 2026 Logo"
      className="mx-auto "
    />
  );
};

const Footer = () => {
  return (
    <div className=" mt-10 container border-t py-6">
      <p className="text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Vemanostava, Inc. All rights reserved.
      </p>
    </div>
  );
};
