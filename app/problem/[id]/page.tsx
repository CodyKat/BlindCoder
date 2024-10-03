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
            <div>
                <div className="stage-container">
                    <div className="problem-description">
                        {problem.description}
                    </div>
                    <ConsoleInput />
                </div>
                <div className="output-console">
                    output console
                </div>
            </div>
        </div>
    );
};

export default ProblemPage;