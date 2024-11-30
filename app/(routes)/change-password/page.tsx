'use client'

import BaseButton from "@/components/common/base-button"
import BaseInput from "@/components/form/base-input"
import BaseAgentInput from "@/components/form/base-input-agent"
import { axiosInstance } from "@/utils/instance"
import { useRouter } from "next/navigation"
import { FieldValues, useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { toast } from "react-toastify"
import Cookies from "js-cookie"

interface RegisterData{
    email:string,
    password:string
}
export default function ChangePassword({searchParams:{email}}:{searchParams:{email:string}}) {
    const { handleSubmit, control ,watch} = useForm()
    const router=useRouter()
    const registerMutation=useMutation((data:RegisterData)=> axiosInstance.post('/auth/change-password',data),{
        onSuccess(data) {
            console.log('sucess',data.data)
            router.replace('/login')
            // router.refresh()
        },
        onError(error:any) {
            toast.error(error.response.data.detail)
            console.log('error',error)
        },
    })
    function LoginSubmit(e: FieldValues) {
        const data={
            email,
            password:e.password
        }
        registerMutation.mutate(data as RegisterData)

    }
    return (
        <>
            <form onSubmit={handleSubmit(LoginSubmit)} className=" sm:w-1/2 w-[90%]  flex flex-col gap-4 p-4 border-2 rounded-lg border-main-2  mt-4 mx-auto mb-4">
                <div className="text-xl text-center font-semibold">Change Password</div>
                {/* <BaseAgentInput name="email" type="email" control={control} placeholder="Enter Email" labelPlacement="outside" label="Email" rules={{ required: "Enter Email" }} /> */}
                <BaseAgentInput name="password" type="password" control={control} placeholder="Enter New Password" labelPlacement="outside" label="New Password" rules={{ required: "Enter New Password" }} />
                <BaseAgentInput name="confirm-password" type="password" control={control} placeholder="Enter Confirm Password" labelPlacement="outside" label="Confirm Password" rules={{ required: "Enter Confirm Password" ,validate:(value)=>watch('password')==value?true:'Passwords Dont Match'}} />
                <BaseButton isLoading={registerMutation.isLoading} isDisabled={registerMutation.isLoading} type="submit" className="min-w-28">Submit</BaseButton>
            </form>
        </>
    )
}