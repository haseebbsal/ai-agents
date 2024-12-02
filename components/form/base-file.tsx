
import { BaseFileProps } from '@/utils/types';
import { useController } from "react-hook-form";
import BaseLabel from './base-label';
import { useState } from 'react';
import Image from 'next/image';


export default function BaseFile({ showHeader, extraClass, headerText, name, control, rules, accept,multiple=false }: BaseFileProps) {
    const { field, fieldState: { error } } = useController({ name, control, rules })
    const [file, setFile] = useState<any>()
    const [files,setFiles]=useState<any>()
    return (
        <>
            <div className="flex flex-col gap-2">
                {showHeader && <h1 className="text-base-primary font-semibold">{headerText}</h1>}
                {error && <p className="text-red-400 text-sm">{error.message}</p>}
                <div className={`p-4 border-2 border-base-default rounded-lg ${extraClass}`}>
                    <div className="bg-content-14 flex items-center justify-center flex-col relative rounded-lg min-h-36 gap-2">
                        {/* <h1 className="">Drag your file here</h1> */}
                        <BaseLabel htmlFor={name} text="Browse Files" />
                        <input multiple={multiple} accept={accept} className="absolute opacity-0 z-0 " {...field} onChange={(e) => {
                            if (e.target.files?.length) {
                                const file = e.target.files
                                if(file.length>1){
                                    setFiles(Object.values(file))
                                    setFile(null)
                                    field.onChange(file)
                                    return 
                                }
                                field.onChange(file)
                                // console.log(file)
                                setFile(file[0])
                                setFiles([])
                            }
                        }} value={undefined} type="file" id={name} />
                    </div>
                </div>
                {file  && (file.type.includes('png') || file.type.includes('jpg') || file.type.includes('jpeg')) && <Image className='p-4 border-2 rounded-lg' src={URL.createObjectURL(file)} width={200} height={200} alt='file' />}
                {file  && !(file.type.includes('png') || file.type.includes('jpg') || file.type.includes('jpeg')) && <p className='p-4 border-2 rounded-lg'>{file.name}</p>}
                {files && <div className='flex flex-col gap-4'>
                    {files.map((e:any)=>{
                        if((e.type.includes('png') || e.type.includes('jpg') || e.type.includes('jpeg'))){
                            return <Image className='p-4 border-2 rounded-lg' src={URL.createObjectURL(e)} width={200} height={200} alt='file' />
                        }
                        return <p className='p-4 border-2 rounded-lg'>{e.name}</p>
                    })}
                    </div>}
            </div>
        </>
    )
}