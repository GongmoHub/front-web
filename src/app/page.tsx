import './main.scss';

const Mainpage: React.FC = () => {
  return (
    <div>
      <div className="main_box_top">
        <div className="information_box"></div>
        <div className="project_box">
          <input className="input_box"></input>
          <div className="button_box">
            <button className="button">피드백 요청</button>
            <button className="button">공모전 검색</button>
          </div>
        </div>
      </div>
      <div className="main_box_bottom"></div>
    </div>
  );
};

export default Mainpage;
