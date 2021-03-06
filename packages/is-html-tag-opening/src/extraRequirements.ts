import { left } from "string-left-right";

function extraRequirements(str: string, idx: number): boolean {
  // either it's opening bracket
  return (
    str[idx] === "<" ||
    // or there's one opening bracket to the left
    str[left(str, idx) as number] === "<"
  );
  // TODO: consider adding clauses for br/> -
  // slash-closing follows, but no opening
}

export { extraRequirements };
