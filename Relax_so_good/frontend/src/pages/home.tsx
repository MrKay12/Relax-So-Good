import Head from "next/head";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa"; // Import the shopping cart icon
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
        <title>Relax So Good</title>
      </Head>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerTitle}>Relax So Good</div>
          <div className={styles.headerButtons}>
            <button className={styles.loginButton}>Login</button>
            <button className={styles.cartButton}>
              <FaShoppingCart />
            </button>
          </div>
        </header>
        <main className="flex flex-col gap-8 items-center">
          <div className={styles.carouselWrapper}>
            <Carousel
              opts={{
                align: "start",
              }}
              className={`w-full ${styles.carousel}`}
            >
              <CarouselContent className={styles.carouselContent}>
                <CarouselItem className={styles.carouselItem}>
                  <div className="p-0.5"> {/* Adjust padding to make items closer */}
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <Image src="/placeholder-image.jpg" alt="Item 1" width={300} height={300} />
                        <p>Description for item 1</p>
                        <p>Price: </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
                <CarouselItem className={styles.carouselItem}>
                  <div className="p-0.5"> {/* Adjust padding to make items closer */}
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <Image src="/placeholder-image.jpg" alt="Item 2" width={300} height={300} />
                        <p>Description for item 2</p>
                        <p>Price: </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
                <CarouselItem className={styles.carouselItem}>
                  <div className="p-0.5"> {/* Adjust padding to make items closer */}
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <Image src="/placeholder-image.jpg" alt="Item 3" width={300} height={300} />
                        <p>Description for item 3</p>
                        <p>Price: </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
                <CarouselItem className={styles.carouselItem}>
                  <div className="p-0.5"> {/* Adjust padding to make items closer */}
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <Image src="/placeholder-image.jpg" alt="Item 4" width={300} height={300} />
                        <p>Description for item 4</p>
                        <p>Price: </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
                <CarouselItem className={styles.carouselItem}>
                  <div className="p-0.5"> {/* Adjust padding to make items closer */}
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <Image src="/placeholder-image.jpg" alt="Item 5" width={300} height={300} />
                        <p>Description for item 5</p>
                        <p>Price: </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <div className={styles.carouselControls}>
                <button className={styles.carouselArrow}>
                  <CarouselPrevious />
                </button>
                <button className={styles.carouselArrow}>
                  <CarouselNext />
                </button>
              </div>
            </Carousel>
          </div>
        </main>
      </div>
    </>
  );
}