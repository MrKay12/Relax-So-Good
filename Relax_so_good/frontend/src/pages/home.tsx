import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/home.module.css";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Homepage</title>
      </Head>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className="text-2xl font-bold">Welcome to the Homepage</h1>
          <button className={styles.loginButton}>Login</button>
        </header>
        <main className="flex flex-col gap-8 items-center">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className={`w-full ${styles.carousel}`}
          >
            <CarouselContent className={styles.carouselContent}>
              <CarouselItem className={styles.carouselItem}>
                <div className="p-0.5"> {/* Adjust padding to make items closer */}
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <Image src="/placeholder-image.jpg" alt="Item 1" width={300} height={300} />
                      <span className="text-3xl font-semibold">Item 1</span>
                      <p>Description for item 1</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem className={styles.carouselItem}>
                <div className="p-0.5"> {/* Adjust padding to make items closer */}
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <Image src="/placeholder-image.jpg" alt="Item 2" width={300} height={300} />
                      <span className="text-3xl font-semibold">Item 2</span>
                      <p>Description for item 2</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem className={styles.carouselItem}>
                <div className="p-0.5"> {/* Adjust padding to make items closer */}
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <Image src="/placeholder-image.jpg" alt="Item 3" width={300} height={300} />
                      <span className="text-3xl font-semibold">Item 3</span>
                      <p>Description for item 3</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem className={styles.carouselItem}>
                <div className="p-0.5"> {/* Adjust padding to make items closer */}
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <Image src="/placeholder-image.jpg" alt="Item 4" width={300} height={300} />
                      <span className="text-3xl font-semibold">Item 4</span>
                      <p>Description for item 4</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem className={styles.carouselItem}>
                <div className="p-0.5"> {/* Adjust padding to make items closer */}
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <Image src="/placeholder-image.jpg" alt="Item 5" width={300} height={300} />
                      <span className="text-3xl font-semibold">Item 5</span>
                      <p>Description for item 5</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            </CarouselContent>
            <div className={styles.carouselControls}>
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </main>
      </div>
    </>
  );
}