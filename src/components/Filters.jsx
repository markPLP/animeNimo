import { Form } from 'react-router-dom';
import FormInput from './FormInput';
import FormSelect from './FormSelect';

const Filters = () => {
  // to filter
  // type - "tv" "movie" "ova" "special" "ona" "music" "cm" "pv" "tv_special"
  // min_score
  //max_score
  // status - "airing" "complete" "upcoming"
  // genres
  // order_by - "mal_id" "title" "start_date" "end_date" "episodes" "score" "scored_by" "rank" "popularity" "members" "favorites"
  // text input search
  // button
  return (
    <Form>
      <FormSelect label="text" />
    </Form>
  );
};

export default Filters;
