import BaseButton from "@/components/common/base-button";
import BaseAgentInput from "@/components/form/base-input-agent";
import Link from "next/link";

export default function About() {
    return (
        <>
            <div className=" flex w-full ml-4 mr-4 flex-col gap-4 p-4 border-2 rounded-lg border-main-2  mt-4 mx-auto mb-4">
                <h1 className="font-semibold">Revolutionizing insurance with AI agents: enhancing efficiency and decision-making</h1>
                <p>Artificial Intelligence (AI) is reshaping the insurance industry by automating repetitive tasks, enhancing decision-making, and improving customer experiences. eData is at the forefront of this change, developing AI agents specifically designed to address the unique challenges of the insurance sector.</p>
                <h1 className="font-semibold">Experience the power of AI, free of charge</h1>
                <p>Our AI agents are accessible for free, operating on a limited data set, which includes anonymized claims data and sample policy documents, allowing insurance professionals around the world to see their impact firsthand. This limited version offers key features such as automated document processing and data extraction, showcasing the potential value of our AI solutions. These agents are browser-based and operate independently of internal insurance systems, ensuring data security while providing valuable insights to executives. Through this initiative, we also aim to foster AI and digital literacy throughout the insurance community.</p>
                <h1 className="font-semibold">Try it today at <a href={'https://www.insurancebots.ai'} target="_blank" className="text-gray-400 underline">InsuranceBots.ai</a></h1>
                <p>Signing up is easy—just visit the InsuranceBots.ai website and register with a username and password. New users receive 25 credits, enabling 25 free AI agent executions. Each 'execution' refers to running a specific AI task, such as analyzing a document or extracting information, demonstrating the capabilities of our AI agents. This limited access helps manage costs since each execution incurs expenses due to the underlying technology.</p>
                <h1 className="font-semibold">Tailored solutions for your organization</h1>
                <p>If your organization wants to integrate AI agents with internal systems or document management platforms, eData offers customizable solutions. For example, integrating these agents can significantly speed up claims processing, reduce manual data entry, and improve overall workflow efficiency.</p>
                <h1 className="font-semibold">Simple, powerful AI at your fingertips</h1>
                <p>Using our AI agents couldn’t be easier. After reading the brief instructions, simply provide a specific task and click the ‘Go’ button to receive the results. It’s a straightforward way to experience the future of insurance technology and understand the value AI can bring to your business.</p>
                <h1 className="font-semibold">Get started today</h1>
                <p>Discover how eData's AI agents can transform your insurance operations. Visit <a href={'https://www.insurancebots.ai'} target="_blank" className="text-gray-400">InsuranceBots.ai</a> to begin your journey towards enhanced efficiency and smarter decision-making.</p>
            </div>
        </>
    )
}