"use client";

import "./page.scss";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserStore } from "@/app/store/user";
import { useEffect } from "react";

export default function Home() {
    const router = useRouter();
    const user = useUserStore((state) => state.user);

    return (
        <main className='home'>
            <div className='home__leftSectionWrapper'>
                <section className='home__leftSection'>
                    <div className='home__leftSectionFixed'>
                        <div className='home__categorySection'>
                            <p>category</p>
                            <div className='categoryWrapper'>
                                <div className='category'>typescript</div>
                                <div>react</div>
                                <div>next</div>
                                <div>react-query</div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div className='home__rightSectionWrapper'>
                <section className='home__rightSection'>
                    <Link href={`/post/1`}>
                        <div className='home__post'>
                            <div className='home__post--image'>
                                <img
                                    src={`https://marketplace.canva.com/EAD2xI0GoM0/1/0/1600w/canva-%ED%95%98%EB%8A%98-%EC%95%BC%EC%99%B8-%EC%9E%90%EC%97%B0-%EC%98%81%EA%B0%90-%EC%9D%B8%EC%9A%A9%EB%AC%B8-%EB%8D%B0%EC%8A%A4%ED%81%AC%ED%86%B1-%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4-rssvAb9JL4I.jpg`}
                                />
                            </div>
                            <div className='home__post--article'>
                                <h2 className='home__post--title'>이건 제목입니다.</h2>
                                <div className='home__post--text'>{`이건 내용인데요 내용이였습니다.이건 내용인데요 내용이였습니다.이건 내용인데요 내용이였습니다.이건 내용인데요 내용이였습니다.이건 내용인데요 내용이였습니다.이건 내용인데요 내용이였습니다.이건 내용인데요 내용이였습니다.이건 내용인데요 내용이였습니다.이건 내용인데요 내용이였습니다.이건 내용인데요 내용이였습니다.이건 내용인데요 내용이였습니다.이건 내용인데요 내용이였습니다.이건 내용인데요 내용이였습니다.이건 내용인데요 내용이였습니다.이건 내용인데요 내용이였습니다.이건 내용인데요 내용이였습니다.이건 내용인데요 내용이였습니다.이건 내용인데요 내용이였습니다.이건 내용인데요 내용이였습니다.이건 내용인데요 내용이였습니다.이건 내용인데요 내용이였습니다.이건 내용인데요 내용이였습니다.`}</div>
                            </div>
                        </div>
                    </Link>
                </section>
            </div>
        </main>
    );
}
