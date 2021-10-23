import React, {FC} from "react";

const ContactInfo: FC = () => {
    return (
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
    )
}


export default ContactInfo;