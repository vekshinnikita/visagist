import React, { FC, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {  featchCourseDetail } from '@/state/courses/courses.actions'
import { selectCourseDetail } from '@/selectors'
import { Link, useParams } from "react-router-dom";


const CourseDetail: FC = () => {
    const dispatch = useDispatch()
    const { pk } = useParams<{ pk: string }>();
   
    useEffect(() => {
        dispatch(featchCourseDetail(Number(pk)))
    }, [pk])
    const course = useSelector(selectCourseDetail);
    console.log(course)
 
    return (
        <main>
            <div className="content">
            <div className="course">
                <div className="container">
                    <div className="course-cover">
                        <div className="row-course">
                            <div className="photo-course" 
                            style={{ backgroundImage: `url(${course.image})` }}>
                            </div>
                            <div className="course-title">
                                <div className="cover-space"></div>
                                <h1>{course.title}</h1>
                            </div>
                        </div>
                    </div>
                    
                    <div className="course-body">
                        <div className="course-description">
                            <p>Модульная система курсов — новый эффективный формат обучения визажистов разработанный нашей командой.</p>

                            <p>Мы создали систему модулей – интенсивных курсов обучения визажистов направленной специализации, для осознанного обучения и достижения высоких результатов.</p>
                                
                            <p>Каждый модуль отвечает вашим конкретным целям и задачам, хотите вы окончить курс в целях личного развития для себя или действительно начать карьеру профессионального визажиста – выбор только за вами.</p>
                                
                            <p>Каждый модуль посвящен одному из основных направлений профессионального макияжа: работа с клиентами (commercial), свадьбы (свадебный стилист, курс по прическам), работа на съемках (photo make-up). Система обучения по модулям позволяет вам максимально углубленно изучать интересующее вас направление или пройти все модули полностью.</p>
                                
                            <p>В программу занятий входят не отдельные техники и виды макияжа, а готовые продающие образы, которые покупают реальные клиенты, а не просто собирают лайки в инстаграм. Каждый модуль ведет преподаватель успешный в своей сфере – клиенты, свадьбы или съемки.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="signup">
                <div className="container">
                    <div className="signup-form">
                        <div className="singup-title after">
                            <h2>Запись на курс</h2>
                        </div>
                        <div className="signup-row a">
                            <a href="#">
                                <div className="signup-btn btn-telegram">
                                    <span>Telegram</span>
                                </div>
                            </a>
                            <a href="#">
                                <div className="signup-btn btn-whatsapp">
                                    <span>Whatsapp</span>
                                </div>
                            </a>
                            <a href="#">
                                <div className="signup-btn btn-instagram">
                                    <span>Instagram</span>
                                </div>
                            </a>
                        </div>
                        
                        
                    </div>  
                </div>
            </div>

            <div className="contact">
                <div className="container">
                    <div className="contact-info">
                        <div className="contact-num-info">
                            <h3>АДРЕС</h3>
                            <div className="contact-row">
                                <p>ул. Сухэ-Батора, 7,</p>
                                <p>Бизнес центр "Винни Пух",</p>
                                <p>4 этаж,</p>
                                <p>410 офис</p>
                            </div>
                        </div>

                        <div className="contact-num-info">
                            <h3>Контакты</h3>
                            <div className="contact-row contact-num">
                                <a href="#">+7 (924) 354 44 54</a>
                                <a href="#" className="a"><p>@lemeshevadasha</p></a>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
        </div>
    </main>
    )
};
  
export default CourseDetail;
