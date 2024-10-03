import ListContainer from "../component/ProblemListContainers";
import problems from "../data/problem";

export default function problemSet() {
    return (
        <div>
            <h1>문제를 누르면 바로 시작됩니다.</h1>
            <ListContainer problems={problems} />
        </div>
    );
};
