import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div>
        <Image 
          src="/images/codingcat1.webp"
          alt="main image"
          layout="responsive"
          width={4}
          height={3}/>
      </div>
    </main>
  );
}
