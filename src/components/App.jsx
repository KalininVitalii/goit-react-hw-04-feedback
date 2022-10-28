import {useState} from 'react';
import { Statistics } from './statistics/statistics'
import { FeedbackOptions } from './feedbackOptions/feedbackOptions'
import { Section } from './section/section';
import { Notification } from './notification/notification';
import { useEffect } from 'react';


export const App = () => {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const options = {
    good,
    neutral,
    bad,
  };

 const handleChange = (event) => {
    const { name } = event.target;
    switch (name) {
      case "good":
        setGood(prevGood => prevGood + 1);
        break;
      case "neutral":
        setNeutral(prevNeutral => prevNeutral + 1);
        break;
      case "bad":
        setBad(prevBad => prevBad + 1);
        break;

      default:
        return null;  
    }   
  }

 const countTotalFeedback  = () => {
    return neutral + good + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    return Math.round((good * 100) / countTotalFeedback());
  };

    return (
      <div>

        <Section title="Please leave feedback">
          <FeedbackOptions options={options} onLeaveFeedback={handleChange} />
        </Section>
        
        <Section title="Statistics">
        {countTotalFeedback()
        ? <Statistics good={good}
              neutral={neutral}
              bad={bad}
              total={countTotalFeedback()}
              positivePercentage={countPositiveFeedbackPercentage()}/>
        : <Notification message="There is no feedback"/>
        }               
        </Section>

      </div>
    );
  
}

