import Image from 'next/image'
import Card from '@/app/Card'

export default function Home() {
    return (
        <div className="flex flex-col w-full h-[39rem] bg-neutral-800 rounded-lg">
            <Card />
        </div>
    )
}
