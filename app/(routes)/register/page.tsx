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
export default function Register() {
    const { handleSubmit, control ,watch} = useForm()
    const router=useRouter()
    const registerMutation=useMutation((data:RegisterData)=> axiosInstance.post('/auth/register',data),{
        onSuccess(data) {
            console.log('sucess',data.data)
            const {accessToken,refreshToken}=data.data.tokens
            Cookies.set('accessToken',accessToken)
            Cookies.set('refreshToken',refreshToken)
            Cookies.set('userData',JSON.stringify({email:data.data.email}))
            router.replace('/')
            router.refresh()
        },
        onError(error:any) {
            toast.error(error.response.data.detail)
            console.log('error',error)
        },
    })
    function LoginSubmit(e: FieldValues) {
        const data={
            email:e.email,
            password:e.password
        }
        registerMutation.mutate(data as RegisterData)

    }
    return (
        <>
            <form onSubmit={handleSubmit(LoginSubmit)} className=" sm:w-1/2 w-[90%]  flex flex-col gap-4 p-4 border-2 rounded-lg border-main-2  mt-4 mx-auto mb-4">
                <div className="text-xl text-center font-semibold">Register</div>
                <BaseAgentInput name="email" type="email" control={control} placeholder="Enter Email" labelPlacement="outside" label="Email" rules={{ required: "Enter Email" }} />
                <BaseAgentInput name="password" type="password" control={control} placeholder="Enter Password" labelPlacement="outside" label="Password" rules={{ required: "Enter Password" }} />
                <BaseAgentInput name="confirm-password" type="password" control={control} placeholder="Enter Confirm Password" labelPlacement="outside" label="Confirm Password" rules={{ required: "Enter Confirm Password" ,validate:(value)=>watch('password')==value?true:'Passwords Dont Match'}} />
                <BaseButton isLoading={registerMutation.isLoading} isDisabled={registerMutation.isLoading} type="submit" className="min-w-28">Register</BaseButton>
            </form>
        </>
    )
}