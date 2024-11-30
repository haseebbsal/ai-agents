
import { BaseFileProps } from '@/utils/types';
import { useController } from "react-hook-form";
import BaseLabel from './base-label';
import { useState } from 'react';
import Image from 'next/image';


export default function BaseFile({ showHeader, extraClass, headerText, name, control, rules, accept }: BaseFileProps) {
    const { field, fieldState: { error } } = useController({ name, control, rules })
    const [file, setFile] = useState<any>()
    return (
        <>
            <div className="flex flex-col gap-2">
                {showHeader && <h1 className="text-base-primary font-semibold">{headerText}</h1>}
                {error && <p className="text-red-400 text-sm">{error.message}</p>}
                <div className={`p-4 border-2 border-base-default rounded-lg ${extraClass}`}>
                    <div className="bg-content-14 flex items-center justify-center flex-col relative rounded-lg min-h-36 gap-2">
                        {/* <h1 className="">Drag your file here</h1> */}
                        <BaseLabel htmlFor="file" text="Browse Files" />
                        <input accept={accept} className="absolute opacity-0 z-0 " {...field} onChange={(e) => {
                            if (e.target.files?.length) {
                                const file = e.target.files
                                field.onChange(file)
                                // console.log(file[0])
                                const convert = URL.createObjectURL(file[0])
                                setFile(file[0])
                                // console.log(convert)
                            }
                        }} value={undefined} type="file" id="file" />
                    </div>
                </div>
                {file  && !file.type.includes('pdf') && <Image className='p-4 border-2 rounded-lg' src={URL.createObjectURL(file)} width={200} height={200} alt='file' />}
                {file  && file.type.includes('pdf') && <p className='p-4 border-2 rounded-lg'>{file.name}</p>}


            </div>
        </>
    )
}