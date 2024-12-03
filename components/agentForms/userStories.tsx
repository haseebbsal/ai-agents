import Image from "next/image"
import { FieldValues, useForm } from "react-hook-form"
import BaseTextArea from "../form/base-textarea"
import BaseButton from "../common/base-button"
import { axiosInstance } from "@/utils/instance"
import { useMutation } from "react-query"
import { useEffect, useState } from "react"
import Markdown from "react-markdown"
import React from "react"
import { AgentFormInteface } from "@/utils/types"
import { useVoiceVisualizer, VoiceVisualizer } from "react-voice-visualizer";
import BaseSelect from "../form/base-select"

const questions = [
    '/audios/question_1.wav',
    '/audios/question_2.wav',
    '/audios/question_3.wav',
    '/audios/question_4.wav',
    '/audios/question_5.wav'
]

export default function UserStoriesForm({ imgSrc, agentInfo, agentText, agent }: AgentFormInteface) {
    const { control, handleSubmit, reset, getValues } = useForm()
    const [data, setData] = useState<any>()
    const [showCanvas, setShowCanvas] = useState<boolean>(false)
    const [audios, setAudios] = useState<any>([])
    const [Error, setError] = useState<null | string>()
    const [currentQuestions, setCurrentQuestion] = useState<number[]>([1])
    const agentMutation = useMutation((data: any) => axiosInstance.postForm(`/agent/file/${agent}`, data), {
        onSuccess(data) {
            console.log('data', data)


            setData(data.data.result.tasks_output)
            return

        },
    })

    function agentSubmit(e: FieldValues) {
        if (audios.length != 5) {
            setError("You Must Answer All Question Audios")
            return
        }
        const formData = new FormData()
        console.log('audios', audios)
        audios.forEach((e: any) => {
            formData.append('files', e)
        })
        formData.append('functionality', e.functionality)
        console.log([...formData.entries()])
        agentMutation.mutate(formData)
    }


    const recorderControls = useVoiceVisualizer({
        onStopRecording() {
            setShowCanvas(false)
        },
    });
    const {
        recordedBlob,
        error,
        audioSrc
    } = recorderControls;

    useEffect(() => {
        if (!recordedBlob) return;
        // console.log(audioSrc)
        // console.log(recordedBlob);
        setAudios([...audios, new File([recordedBlob], "name")])
        setError(null)
        if (currentQuestions.length != Number(getValues('functionality')*5)) {
            setCurrentQuestion([...currentQuestions, currentQuestions.length + 1])
        }
    }, [recordedBlob, error]);

    // useEffect(()=>{
    //     if(currentQuestions.length>1){
    //         setCurrentQuestion([...currentQuestions, currentQuestions.length + 1])
    //     }
    // },[getValues('functionality')])

    useEffect(() => {
        if (!error) return;

        console.error(error);
    }, [error]);


    return (
        <>
            <div onSubmit={handleSubmit(agentSubmit)} className=" flex-1 ml-4 flex flex-col gap-4 p-4 border-2 rounded-lg border-main-2  mt-4 sm:ml-0 mr-4 ml-4  mb-4 w-full">
                <div className="flex justify-between items-center pb-8 border-b-2 border-main-2">
                    <div className="flex gap-4 items-center font-semibold">
                        <Image src={imgSrc} alt="agent Icon" width={35} height={35} />
                        <p className="text-text-2 font-semibold text-xl">{agentText}</p>
                    </div>
                </div>
                <p className="text-text-1">{agentInfo}</p>
                {
                    showCanvas && <VoiceVisualizer width={200} height={200} controls={recorderControls} mainBarColor="#113378" onlyRecording={true} isDefaultUIShown={true} isAudioProcessingTextShown={false} />
                }
                <form onSubmit={handleSubmit(agentSubmit)} className="flex flex-col gap-8">
                    <div className="flex flex-col gap-4 ">
                       {!getValues('functionality') && <BaseSelect labelPlacement="outside" placeholder="Select Number Of Functionalities" control={control} name="functionality" label="How many functionalities would you like to define?" rules={{ required: "Select Number Of Functionalities" }} data={['1', '2', '3']} />} 
                    </div>

                    {Error && <p className="text-red-600">{Error}</p>}
                    { getValues('functionality') &&
                        currentQuestions.map((e, number: number) =>

                            <div key={`question ${e}`} className="flex flex-col gap-4">

                                <div className="flex gap-8 items-end">
                                    <div className="flex flex-col gap-4">
                                        <p className="font-semibold"> Functionality {number+1<=5?"1":number+1<=10?"2":"3"} Question {number + 1}</p>
                                        <audio controls>
                                            <source src={`/audios/question_${e}.wav`} type="audio/wav" />
                                            Your browser does not support the audio element.
                                        </audio>
                                    </div>
                                    {!audios[number] && <BaseButton extraClass="p-6" onClick={() => setShowCanvas(!showCanvas)}>Answer Question</BaseButton>}
                                    {
                                        audios[number] && <div className="flex flex-col gap-4">
                                            <p className="font-semibold"> Response</p>
                                            <audio controls>
                                                <source src={URL.createObjectURL(audios[number])} type="audio/wav" />
                                                Your browser does not support the audio element.
                                            </audio>
                                        </div>
                                    }
                                </div>


                            </div>
                        )
                    }
                    <div className="flex justify-end gap-4">
                        <BaseButton isDisabled={agentMutation.isLoading} isLoading={agentMutation.isLoading} type="submit" extraClass="min-w-40">Go</BaseButton>
                    </div>

                </form>
                <div className="  flex flex-col gap-10">

                    {
                        data && data?.map((e: any, number: number) => {
                            return (
                                <div key={number} className="flex flex-col shadow-lg p-4 rounded-lg gap-4">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex gap-4">
                                            <p className="font-semibold">Agent:</p>
                                            <p>{e.agent}</p>
                                        </div>
                                        <div className="flex gap-4">
                                            <p className="font-semibold">Task Name:</p>
                                            <p>{e.name.replaceAll('_', ' ').split(' ').map((word: any) =>
                                                word.charAt(0).toUpperCase() + word.slice(1)
                                            ).join(' ')}</p>
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <Markdown>{e.raw}</Markdown>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        )
                    }
                </div>
            </div>
        </>
    )
}