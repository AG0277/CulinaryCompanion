import React from "react";

interface Props {
  measures: {
    metric: {
      amount: number;
      unitLong: string;
      unitShort: string;
    };
    us: {
      amount: number;
      unitLong: string;
      unitShort: string;
    };
  };
  name: string;
}

const RecipeIngredient: React.FC<Props> = ({
  measures,
  name,
}: Props): JSX.Element => {
  return (
    <div>
      <p>
        {measures.metric.amount}&nbsp;
        {measures.metric.unitLong}&nbsp;
        {name}
      </p>
    </div>
  );
};

export default RecipeIngredient;
