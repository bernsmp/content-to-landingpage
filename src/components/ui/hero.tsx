"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Mockup, MockupFrame } from "@/components/ui/mockup"

interface HeroProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode
  subtitle?: string
  eyebrow?: string
  ctaText?: string
  ctaLink?: string
  mockupImage?: {
    src: string
    alt: string
    width: number
    height: number
  }
}

const Hero = React.forwardRef<HTMLDivElement, HeroProps>(
  ({ className, title, subtitle, eyebrow, ctaText, ctaLink, mockupImage, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-center bg-[#f3f1ea] pb-24 md:pb-32", className)}
        {...props}
      >
        {eyebrow && (
          <p
            className="font-sans uppercase tracking-[0.51em] leading-[133%] text-center text-[19px] mt-[249px] mb-8 text-[#000000] animate-appear opacity-0"
          >
            {eyebrow}
          </p>
        )}

        <h1
          className="text-[64px] leading-[83px] text-center px-4 lg:px-[314px] text-[#000000] animate-appear opacity-0 delay-100"
        >
          {title}
        </h1>

        {subtitle && (
          <p
            className="text-[28px] text-center font-sans font-light px-4 lg:px-[314px] mt-[25px] mb-[48px] leading-[133%] text-[#000000] animate-appear opacity-0 delay-300"
          >
            {subtitle}
          </p>
        )}

        {ctaText && ctaLink && (
          <Link href={ctaLink}>
            <div
              className="inline-flex items-center justify-center bg-[#000000] text-[#ffffff] rounded-[10px] hover:bg-[#000000]/90 transition-colors font-sans px-8 h-[49px] animate-appear opacity-0 delay-500"
            >
              <span className="text-[19px] whitespace-nowrap">{ctaText}</span>
              <svg
                className="ml-3 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </Link>
        )}

        {mockupImage && (
          <div className="mt-20 w-full relative animate-appear opacity-0 delay-700">
            <MockupFrame>
              <Mockup type="responsive">
                <Image
                  src={mockupImage.src}
                  alt={mockupImage.alt}
                  width={mockupImage.width}
                  height={mockupImage.height}
                  className="w-full"
                  priority
                />
              </Mockup>
            </MockupFrame>
            <div
              className="absolute bottom-0 left-0 right-0 w-full h-[303px]"
              style={{
                background: "linear-gradient(to top, #DCD5C1 0%, rgba(217, 217, 217, 0) 100%)",
                zIndex: 10,
              }}
            />
          </div>
        )}
      </div>
    )
  }
)
Hero.displayName = "Hero"

export { Hero }
