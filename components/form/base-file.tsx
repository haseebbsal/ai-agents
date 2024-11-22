
import { BaseFileProps } from '@/utils/types';
import { useController } from "react-hook-form";
import BaseLabel from './base-label';


export default function BaseFile({ showHeader, extraClass, headerText, name, control, rules }: BaseFileProps) {
    const { field, fieldState: { error } } = useController({ name, control, rules })
    return (
        <>
            <div className="flex flex-col gap-2">
                {showHeader && <h1 className="text-base-primary">{headerText}</h1>}
                {error && <p className="text-red-400 text-sm">{error.message}</p>}
                <div className={`p-4 border-2 border-base-default rounded-lg ${extraClass}`}>
                    <div className="bg-content-14 flex items-center justify-center flex-col relative rounded-lg min-h-36 gap-2">
                        <h1 className="">Drag your file here</h1>
                        <BaseLabel htmlFor="file" text="Browse Files" />
                        <input accept=".jpeg,.jpg,.png" className="absolute opacity-0" {...field} onChange={(e) => {
                            if (e.target.files?.length) {
                                field.onChange(e.target.files)
                            }
                        }}  value={undefined} type="file" id="file" />
                    </div>
                </div>
            </div>
        </>
    )
}