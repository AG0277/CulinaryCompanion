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
        <p className="font-bold">
          {measures.metric.amount}
          {measures.metric.unitLong}
        </p>
        {name}
      </p>
    </div>
  );
};

export default RecipeIngredient;
