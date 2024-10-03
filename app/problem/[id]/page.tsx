import problems from "../../data/problem";
import ConsoleInput from "@/app/component/ConsoleInput";

const ProblemPage = ({ params }: { params: {id: string } }) => {
    const id = params.id;

    const problem = problems.find((p) => p.id === id);
    if (!problem) {
        console.log(id);
        return <div>problem not found</div>;
    }

    return (
        <div>
            <h1>{problem.title}</h1>
            <p>{problem.description}</p>
            <ConsoleInput />
        </div>
    );
};

export default ProblemPage;