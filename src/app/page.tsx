import "./page.scss";
import Link from "next/link";
import { useUserStore } from "@/store/user";
import Post from "./__components/Post";

export default function Home() {
    return (
        <>
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
                        <Post />
                    </section>
                </div>
            </main>
        </>
    );
}
